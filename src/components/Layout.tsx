import Footer from "./Footer";
import Header from "./Header";
// import LeftSideBar from "./LeftSideBar";
// import RightSideBar from "./RightSideBar";
import Head from 'next/head';

interface IProps {
    children: React.ReactNode;
    title: string;
}

const BaseLayout = (props: IProps) => {
    const { children, title } = props;
    return (
        <div className="">
            <Head>
                <title>{title}</title>
            </Head>

            <Header />
            <hr className="mb-10" />
            <div className="lg:px-28 px-5">
                {/* <div className="p-10">
                    <LeftSideBar />
                </div> */}
                <div className="">
                    {children}
                </div>
                {/* <div className="p-10">
                    <RightSideBar />
                </div> */}
            </div>

            <Footer />
        </div>
    )
};

export default BaseLayout;
