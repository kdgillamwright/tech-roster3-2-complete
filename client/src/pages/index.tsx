import { getTechnologies } from '@/tools/DataManager';
import { Technology } from '@/tools/data.model';

export default function Home({ technologies }:{technologies:Technology[]}) {

  return (
    <div className="text-blue-400 font-bold text-xl p-4">
      <pre>
      {JSON.stringify(technologies, null, "\t")}
      </pre>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      technologies: await getTechnologies()
    }
  }
}