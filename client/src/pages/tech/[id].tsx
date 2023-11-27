import { getTechnologies } from '@/tools/DataManager';
import { useRouter, NextRouter } from "next/router";
import { ComponentProps, Course, Technology } from "@/tools/data.model";

// export default function Tech({ technologies }:ComponentProps) {
export default function Tech({ technology }: { technology: Technology }) {

  // // APPROACH I : Dynamic routing on the Client Side (CSR)
  // const router:NextRouter = useRouter();
  // const { id } = router.query;
  // console.log("id: ", id);

  // // find the Technology object within the JSON that matches the id
  // let technology:Technology|undefined = technologies.find(item => item._id == id);


  // ---------------------------------- render to the DOM
  return (
    <div className="pt-2">
      <div className="font-bold">
        <a href={`/`}><i className="fa-solid fa-arrow-left"></i></a> Details for {technology?.name}
      </div>
      <div className="max-w-3xl pb-4">{technology?.description}</div><div className="pb-1">Difficulty:</div><div className="pb-2">
        <i className={`${(technology.difficulty >= 1) ? "fas fa-square text-accent pr-0.5" : "fas fa-square text-greyed-out pr-0.5"}`}></i>
        <i className={`${(technology.difficulty >= 2) ? "fas fa-square text-accent pr-0.5" : "fas fa-square text-greyed-out pr-0.5"}`}></i>
        <i className={`${(technology.difficulty >= 3) ? "fas fa-square text-accent pr-0.5" : "fas fa-square text-greyed-out pr-0.5"}`}></i>
        <i className={`${(technology.difficulty >= 4) ? "fas fa-square text-accent pr-0.5" : "fas fa-square text-greyed-out pr-0.5"}`}></i>
        <i className={`${(technology.difficulty >= 5) ? "fas fa-square text-accent pr-0.5" : "fas fa-square text-greyed-out pr-0.5"}`}></i>
      </div>
      <div className="py-2">Required in courses:
        <div>
          {technology.courses.map((course: Course, n: number) =>
            <div key={n} className="ml-8 pl-2.5 py-0.5 border-l-4 border-solid border-accent">
              <div className="text-black font-bold">
                {`${course.code} ${course.name}`}
              </div>
            </div>
          )}
        </div>
      </div >
    </div>
  );

}

// export async function getServerSideProps() {
//     return {
//       props: {
//         technologies: await getTechnologies()
//       }
//     }
// }

export async function getStaticPaths() {
  const technologies: Technology[] = await getTechnologies();

  // get the paths we want to pre-render based on data
  const paths: Object[] = technologies.map((technology: Technology) => ({
    params: { id: technology._id }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {

  const technologies: Technology[] = await getTechnologies();
  let technology: Technology | undefined = technologies.find(item => item._id == params.id);

  return {
    props: {
      technology: technology
    }
  }
}