import { Technology } from "@/tools/data.model";
import { getTechnologiesForCourse } from "@/tools/DataManager";

export default function Home({ technologies }:{technologies:Technology[]}) {
    return (
        <div className="text-blue-400 font-bold text-xl p-4">
            <pre>
                {JSON.stringify(technologies, null, "\t")}
            </pre>
        </div>
    )
}

// --------------------------------- challenge solution
export async function getServerSideProps({params}:{params:{code:string}}) {
    return {
      props: {
        technologies: await getTechnologiesForCourse(params.code)
      }
    }
}
// ----------------------------------------------------