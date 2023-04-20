import {useRouter} from "next/router";

/**
 *
 * @constructor
 */
export default function FeaturePage() {
    const router = useRouter();
    const id = router.query.id as string;
    const feature = router.query.feature as string;

    return (
        <>
            <h1>Post: {id}</h1>
            <h1>Comment: {feature}</h1>
        </>
    );
}
