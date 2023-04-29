import BaseLayout from "@/components/Layout";

export default function About() {
    return (
        <BaseLayout
            title="About Random Chaos - Generate random numbers, colors, names, countries, and more"
        >
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">About</h1>
                <div className="text-2xl">
                    <p>
                        random-abcs is a collection of utilities for
                        generating random numbers, colors, names, countries, text, and more.
                    </p>
                </div>
            </div>
        </BaseLayout>
    );
}
