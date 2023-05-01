/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import BaseLayout from '../components/Layout';
import { Card } from 'antd';
import Image from 'next/image';
const { Meta } = Card;


export default function Home() {

  return (
    <BaseLayout title='Random - ABCs - Generate random numbers, colors, names, countries, and more'>
      <div className=''>
        <h1 className='text-xl font-bold mb-5'>Random Generators</h1>
        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Link href={"/random-group"} >
            <Card
              hoverable
              cover={<img
                src="/random-grp.svg"
                alt='Random Group'
                style={{ height: 200 }}
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

          <Link href={"/random-text"} >
            <Card
              hoverable
              cover={<img
                src="/random-text.svg"
                alt='Random Text'
                style={{ height: 200 }}
              />
              }
              className='cursor-pointer'
            >
              <Meta
                title="Random Text"
                description="Generate random text. e.g. Lorem Ipsum."
              />
            </Card>
          </Link>

          <Link href={"/random-number"}>
            <Card
              hoverable
              cover={<img
                src="/random-num.svg"
                alt='Random Number'
                style={{ height: 200 }}
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
              cover={<img
                src="/dices.svg"
                alt='Throw Dice'
                style={{ height: 200 }}
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
              cover={<img
                src="/random-color.svg"
                alt='Random Color'
                style={{ height: 200 }}
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
              cover={<img
                src="/coin.svg"
                alt='Flip Coin'
                style={{ height: 200 }}
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
              cover={<img
                src="/country.svg"
                alt='Random Countries'
                style={{ height: 200, width: 260 }}
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
          <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <Link href={"/json-formatter"}>
              <Card
                hoverable
                cover={<img
                  src="/json-file.svg"
                  alt='JSON Formatter'
                  style={{ height: 200 }}
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
                cover={<img
                  src="/jsontocsv.png"
                  alt='JSON to CSV'
                  style={{ height: 200, width: 260 }}
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
                cover={<img
                  src="/csvtojson.png"
                  style={{ height: 200, width: 260 }}
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
