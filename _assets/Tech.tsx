import { getTechnologies } from '@/tools/DataManager';

export default function Tech({ technologies }:ComponentProps) {

    // ---------------------------------- render to the DOM
    return(
        <div className="pt-2">
            <div className="font-bold">
                Details for ???
            </div>
            <div className="max-w-3xl pb-4">???</div>

            <div className="pb-1">Difficulty:</div>
            <div className="pb-2">
                <i className="fas fa-square text-greyed-out pr-0.5"></i>
                <i className="fas fa-square text-greyed-out pr-0.5"></i>
                <i className="fas fa-square text-greyed-out pr-0.5"></i>
                <i className="fas fa-square text-greyed-out pr-0.5"></i>
                <i className="fas fa-square text-greyed-out pr-0.5"></i>                
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