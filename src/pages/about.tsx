import BaseLayout from "@/components/Layout";

export default function About() {
    return (
        <BaseLayout
            title="About Random Chaos - Generate random numbers, colors, names, countries, and more"
        >
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">About</h1>
                <p>
                    random-abcs is a collection of utilities for
                    generating random numbers, colors, names, countries, text, and more.
                </p>
            </div>
        </BaseLayout>
    );
}
