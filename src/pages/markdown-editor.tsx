import { useState, useEffect } from 'react';
import {
    Button,
    Input,
    Card,
    Dropdown,
} from 'antd';
import type { MenuProps } from 'antd';
import BaseLayout from '@/components/Layout';
import {
    ExpandOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import codeFrontmatter from 'remark-code-frontmatter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import { saveAs } from 'file-saver'

const sampleMarkdown = `
Start typing here ...
---

# Hey There!
This is a free online markdown editor. It allows you to write markdown and export it to various formats. 
## Features
   - Download as .md or .html
   - Fullscreen mode
   - Export as HTML
   - Export as Markdown
   - Syntax highlighting
   - Live preview

   You can also use the following markdown syntax:

   - **Bold**
   - *Italic*
   - Code blocks
\`\`\`
This is a code block
\`\`\`

- [A Link to random-abcs](https://randomabcs.com)
- ![Image](some-image-url)
- # Heading 1
- ## Heading 2
- ### Heading 3
- #### Heading 4
- ##### Heading 5
- ###### Heading 6
- > Blockquote
- List item 1
- - List item 2
- - List item 3
   - 1. List item 1
   - 2. List item 2
   - 3. List item 3
 - ---
 - Horizontal rule
- \`Inline code\`

\`\`\`
// Code block
const greeting = 'Hello World!';
console.log(greeting);
\`\`\`

A Table 

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

- [x] Task 1
- [x] Task 2
- [ ] Task 3

- ---
### Support
- If you like this tool, please share it with your friends!
- If you have any suggestions or feedback [use this form](https://forms.gle/DkPNQwgvWS1Ffxct5)
`

export default function JSONFormatter() {
    const [markdownInput, setmarkdownInput] = useState(sampleMarkdown);
    const [fullScreen, setFullScreen] = useState(false);
    const [mdInHtml, setMdInHtml] = useState<any>(null)


    useEffect(() => {
        if (!markdownInput) return;
        const convertMarkdownToHtml = async () => {
            const result = await unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(codeFrontmatter)
                .use(remarkHtml)
                .process(markdownInput);
            setMdInHtml(result);
        }
        convertMarkdownToHtml();
    }, [markdownInput])


    const handleMarkdownChange = (e: any) => {
        setmarkdownInput(e.target.value);
    }

    const downloadMarkdownAsMd = () => {
        if (!markdownInput) return;

        saveAs(
            new Blob([markdownInput], { type: 'text/markdown' }),
            `markdown-${Date.now()}.md`
        );
    }

    const downloadMarkdownAsHtml = async () => {
        if (!mdInHtml) return;
        saveAs(
            new Blob([mdInHtml], { type: 'text/html' }),
            `markdown-to-html${Date.now()}.html`
        );
    };


    const downloadMenuItems: MenuProps['items'] = [
        {
            key: 'md',
            label: 'Download as .md',
            onClick: downloadMarkdownAsMd,
        },
        {
            key: 'html',
            label: 'Download as .html',
            onClick: downloadMarkdownAsHtml,
        },
    ];

    return (
        <BaseLayout title="Markdown Editor/Viewer - Random ABCs Tools | Free Online Markdonw editor">
            <div>
                <h1 className="text-2xl mb-4 text-center">Markdown Editor</h1>
                <hr className="mb-4" />
                <div className={`grid grid-cols-2 ${fullScreen ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-10 overflow-scroll' : ''}`}>
                    <Card className='shadow-sm border-2 border-gray-200'>
                        <div>
                            <h2 className="text-2xl mb-4">Raw Markdown</h2>
                            <hr className='mb-4' />
                        </div>
                        <Input.TextArea
                            value={markdownInput}
                            onChange={handleMarkdownChange}
                            placeholder="Start typing your markdown here..."
                            className='pt-4'
                            bordered={false}
                            autoSize={{ minRows: 10, maxRows: 10000 }}
                        />
                    </Card>
                    <div >
                        <Card className='shadow-lg border-2 border-gray-200' >
                            <div className='flex justify-end'>
                                {/* <h2 className="text-2xl mb-4">Output</h2> */}
                                <div className='mb-4'>
                                    <Dropdown
                                        menu={{
                                            items: downloadMenuItems,
                                        }}
                                        placement="bottom"
                                        arrow
                                        trigger={['click']}

                                    >
                                        <Button
                                            type="default"
                                            className='text-gray-500 hover:bg-gray-100 font-bold'
                                        >
                                            Download
                                        </Button>
                                    </Dropdown>
                                    <Button
                                        type="default"
                                        className='text-gray-500 hover:bg-gray-100 font-bold ml-2'
                                        onClick={() => setFullScreen(!fullScreen)}
                                        icon={fullScreen ? <CloseOutlined /> : <ExpandOutlined />}
                                    />
                                </div>
                            </div>
                            <hr className='mb-4' />
                            <article className="prose">
                                <ReactMarkdown
                                    remarkPlugins={[
                                        remarkGfm,
                                        codeFrontmatter
                                    ]}
                                >
                                    {markdownInput}
                                </ReactMarkdown>
                            </article>
                        </Card>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

