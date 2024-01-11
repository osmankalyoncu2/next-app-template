export const metadata = {
    title: "Welcome",
}

import Title from "@/components/ui/Title"

export default function Welcome() {
    return (
        <main
            className=""
        >
            <Title
                title={"Welcome!"}
                subtitle={"Hey! Welcome to my super cool app!"}
            />
        </main>
    )
}