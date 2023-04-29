import { useState } from 'react';
import {
    Button,
    Form,
    InputNumber,
    Tag,
    Table,
    Input,
    Card,
} from 'antd';
import {
    CopyOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

interface RandomNameGroupsProps {
    showSuccessMessage: (message: string) => void;
}

export default function RandomNameGroups(props: RandomNameGroupsProps) {
    const { showSuccessMessage } = props;
    const [groups, setGroups] = useState<any>([]);

    const handleGroupGenerator = (values: {
        items: string,
        groupNum: number,
    }) => {
        const { items, groupNum } = values;
        const itemArray = items.split(',').map(item => item.trim());

        // Shuffle array to randomize the order of names
        itemArray.sort(() => Math.random() - 0.5);

        let tempGroups: any = Array.from({ length: groupNum }, () => []);
        let i = 0;

        while (itemArray.length > 0) {
            tempGroups[i].push(itemArray.pop());
            i = (i + 1) % groupNum; // Loop back to the first group when we reach the end
        }


        setGroups(tempGroups);
    }


    const handleCopy = () => {
        if (groups.length === 0) {
            showSuccessMessage('Nothing to copy!');
            return;
        }

        let text = ""
        for (let i = 0; i < groups.length; i++) {
            text += `Group ${i + 1}:\n`;
            for (let j = 0; j < groups[i].length; j++) {
                text += `${groups[i][j]}\n`;
            }
            text += '\n';
        }

        navigator.clipboard.writeText(text);
        showSuccessMessage('Copied to clipboard!');
    };

    return (
        <div className='text-center mt-2 max-w-prose mx-auto'>
            <Card
                className='shadow-lg border-2 border-gray-200'
            >
                <Form
                    name="Group Generator"
                    initialValues={{ remember: true }}
                    onFinish={handleGroupGenerator}
                    autoComplete="off"
                    className='w-full'
                >
                    <Form.Item
                        label="Items"
                        name="items"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Enter items separated by commas. Ex: John, Jane, Joe"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Number of Groups"
                        name="groupNum"
                    >
                        <InputNumber
                            min={1}
                            placeholder='2'
                        />
                    </Form.Item>

                    <DisplayGroups groups={groups} />
                    <div className='flex'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  w-full'
                        >
                            Generate
                        </Button>
                        <Button
                            type="ghost"
                            onClick={handleCopy}
                            className='text-black hover:bg-gray-100 font-bold'
                        >
                            <CopyOutlined />
                        </Button>
                    </div>

                </Form>
            </Card>
        </div>
    )
}


interface DisplayGroupsProps {
    groups: string[][],
}

const DisplayGroups = (props: DisplayGroupsProps) => {
    const { groups } = props;

    return (
        <div>
            <Table
                dataSource={groups.map((group, index) => ({
                    key: index,
                    group: group,
                    index: index,
                }))}
                columns={[
                    {
                        title: 'Group',
                        dataIndex: 'index',
                        key: 'index',
                        render: (index: number) => (
                            <div className='flex'>
                                <Tag color='blue'>
                                    Group {index + 1}
                                </Tag>
                            </div>
                        )
                    },
                    {
                        title: 'Members',
                        dataIndex: 'group',
                        key: 'group',
                        render: (group: string[]) => (
                            <div className='flex'>
                                {group.map((member, index) => (
                                    <Tag key={index} className='mr-2'>
                                        {member}
                                    </Tag>
                                ))}
                            </div>
                        )
                    }

                ]}
                pagination={false}
            />
        </div>
    )
}
