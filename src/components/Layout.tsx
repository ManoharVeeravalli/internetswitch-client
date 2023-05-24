import Header from "./Header";


function Layout({ children, Heading = <></> }: { children: React.ReactNode, Heading?: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>
                <section>
                    <div>
                        {Heading && Heading}
                    </div>

                    <div>
                        {children}
                    </div>
                </section>
            </main>
        </>

    );
}

export default Layout;