import BaseLayout from "@/components/Layout"

const Suggest = () => {
    return (
        <BaseLayout title="Suggest a feature">
            <div className="flex flex-col items-center justify-center h-screen">
                <div>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSf1lwkCoUAkUSY0e_U74Ma5R-1pJusBcoXwsY1mThCTcnzGZw/viewform?embedded=true"
                        width="722"
                        height="753"
                        // @ts-ignore // eslint-disable-next-line
                        frameborder="0"
                        marginheight="0"
                        marginwidth="0"
                    >
                        Loading…
                    </iframe>
                </div>
            </div>
        </BaseLayout>
    )
}

export default Suggest
