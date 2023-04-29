import Link from 'next/link';
import BaseLayout from '../components/Layout';
import { Card, message } from 'antd';
import Image from 'next/image';
const { Meta } = Card;


export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <BaseLayout title='Random - ABCs - Generate random numbers, colors, names, countries, and more'>
      {contextHolder}
      <div className='flex flex-col'>
        <h1 className='text-xl font-bold mb-5'>Random Generators</h1>
        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Link href={"/random-group"}>
            <Card
              hoverable
              cover={<Image
                src="/random-group.png"
                width={200}
                height={200}
                alt='Random Group'
              />
              }
              className='cursor-pointer'
            >
              <Meta
                title="Random Group"
                description="Randomly group a list of items. e.g. Group students into teams."
              />
            </Card>
          </Link>

          <Link href={"/random-number"}>
            <Card
              hoverable
              cover={<Image
                src="/random-number.png"
                width={200}
                height={200}
                alt='Random Number'
              />
              }
              className='cursor-pointer'
            >
              <Meta
                title="Random Number"
                description="Generate a random number between two numbers."
              />
            </Card>
          </Link>
          <Link href={"/throw-dice"}>
            <Card
              hoverable
              cover={<Image
                src="/throw-dice.png"
                width={200}
                height={200}
                alt='Throw Dice'
              />
              }
              className='cursor-pointer'
            >
              <Meta
                title="Throw a Dice"
                description="Throw a dice and get a number between 1 and 6."
              />
            </Card>
          </Link>
          <Link href={"/random-color"}>
            <Card
              hoverable
              cover={<Image
                src="/random-color.png"
                width={200}
                height={200}
                alt='Random Color'
              />
              }
              className='cursor-pointer'
            >
              <Meta
                title="Random Color"
                description="Generate a random color in HEX and RGB format."
              />
            </Card>
          </Link>
          <Link href={"/flip-coin"}>
            <Card
              hoverable
              cover={<Image
                src="/flip-coin.png"
                width={200}
                height={200}
                alt='Flip Coin'
              />
              }
              className='cursor-pointer'
            >
              <Meta
                title="Flip a Coin"
                description="Flip a coin and get heads or tails."
              />
            </Card>
          </Link>
          <Link href={"/random-countries"}>
            <Card
              hoverable
              cover={<Image
                src="/random-countries.png"
                width={200}
                height={200}
                alt='Random Countries'
              />
              }
              className='cursor-pointer'
            >
              <Meta
                title="Random Countries"
                description="Generate a random country name."
              />
            </Card>
          </Link>

        </div>
        <hr className='my-10' />
        <div>
          <h1 className='text-xl font-bold mb-5 mt-10'>Utilities</h1>
          <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <Link href={"/json-formatter"}>
              <Card
                hoverable
                cover={<Image
                  src="/json-formatter.png"
                  width={200}
                  height={200}
                  alt='JSON Formatter'
                />
                }
                className='cursor-pointer'
              >
                <Meta
                  title="JSON Formatter"
                  description="Load, parse, format, and beautify JSON data."
                />
              </Card>
            </Link>
            <Link href={"/json-to-csv"}>
              <Card
                hoverable
                cover={<Image
                  src="/json-to-csv.png"
                  width={200}
                  height={200}
                  alt='JSON to CSV'
                />
                }
                className='cursor-pointer'
              >
                <Meta
                  title="JSON to CSV"
                  description="Load, parse and convert JSON data to CSV format."
                />
              </Card>
            </Link>
            <Link href={"/csv-to-json"}>
              <Card
                hoverable
                cover={<Image
                  src="/csv-to-json.png"
                  width={200}
                  height={200}
                  alt='CSV to JSON'
                />
                }
                className='cursor-pointer'
              >
                <Meta
                  title="CSV to JSON"
                  description="Load, parse and convert CSV data to JSON format."
                />
              </Card>
            </Link>
          </div>
        </div>

      </div>
    </BaseLayout>
  )
}
