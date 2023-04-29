import BaseLayout from "@/components/Layout";

export default function About() {
    return (
        <BaseLayout
            title="About Random Chaos - Generate random numbers, colors, names, countries, and more"
        >
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">About</h1>
                <p className="mt-2">
                    Random-ABCs is a collection of:
                </p>
                <div className="ml-2">
                    <p>
                        - Random generators numbers, colors, names, countries, texts, groups,
                    </p>
                    <p>
                        - Utilities for loading, parsing, and manipulating data structures, e.g. JSON-to-CSV, CSV-to-JSON, etc.
                    </p>
                </div>
            </div>
        </BaseLayout>
    );
}
