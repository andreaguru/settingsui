import ConfigurationNotFound from "assets/conf_not_found.min.svg";
import Image from "next/image";

export default function unauthorized() {
    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ fontSize: "3rem" }}>Unauthorized</h1>
            <Image
                alt=""
                layout="fixed"
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
                src={ConfigurationNotFound}
                width={225}
                height={54}
                objectFit="contain"
            />
            <h1>Please log in to view this content</h1>
        </div>
    );
}
