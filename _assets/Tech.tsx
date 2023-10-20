import { getTechnologies } from '@/tools/DataManager';

export default function Tech() {

    // ---------------------------------- render to the DOM
    return(
        <div className="pt-2">
            <div className="font-bold">
                Details for ???
            </div>
            <div className="max-w-3xl pb-4">???</div>

            <div className="pb-1">Difficulty:</div>
            <div className="pb-2">
            </div>

            <div className="py-2">Required in courses:</div>
        </div>
    );
}

export async function getServerSideProps() {
    return {
      props: {
        technologies: await getTechnologies()
      }
    }
}