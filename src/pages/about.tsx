import BaseLayout from "@/components/Layout";
import { Card } from 'antd';

export default function About() {
    return (
        <BaseLayout
            title="About Random Chaos - Generate random numbers, colors, names, countries, and more"
        >
            <Card
                title={<h1 className="text-2xl font-bold">About</h1>}
                className="mt-2"
            >
                <div className="flex flex-col">
                    <p className="mt-2 mb-2">
                        Random-ABCs is a collection of:
                    </p>
                    <div className="ml-2">
                        <p>
                            - Random generators for numbers, colors, names, countries, texts, groups, etc.
                        </p>
                        <p>
                            - Utilities for loading, parsing, and manipulating data structures like JSON, CSV, e.g. JSON-to-CSV, CSV-to-JSON, JSON viewer, Markdown editor/viewer etc.
                        </p>
                    </div>
                    <div className="mt-2">
                        <p className="mt-2">
                            Created by <a
                                href="https://www.linkedin.com/in/risingdeveloper/"
                                className="text-blue-500 hover:text-blue-700"
                                target="_blank"
                            >Rising Odegua</a>
                        </p>
                    </div>
                </div>
            </Card>
        </BaseLayout >
    );
}
