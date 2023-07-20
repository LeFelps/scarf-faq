import Banner from "@/components/banner";
import bannerImage from "../../public/pexels-yan-krukau-9072394.jpg"
import PageContent from "@/components/layout/content";
import Faq from "@/components/faq";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Banner image={bannerImage} title="perguntas frequentes" />
      <PageContent>
        <Faq />
        <div className="flex justify-center mt-12">
          <Link href={"/question/list"} className="border mr-6 border-purple-500 hover:border-purple-700 text-purple-500 hover:text-purple-700 font-bold py-2 px-4 rounded"
            type="submit">
            Gerenciar perguntas
          </Link>
          <Link href={"/question"} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            type="submit">
            Adicionar pergunta
          </Link>
        </div>
      </PageContent>
    </>
  )
}
