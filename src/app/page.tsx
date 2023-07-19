import bannerImage from "../../public/pexels-yan-krukau-9072394.jpg"
import Banner from "./components/banner"
import Faq from "./components/faq"
import Footer from "./components/footer"
import PageContent from "./components/layout/content"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Banner image={bannerImage} title="perguntas frequentes" />
      <PageContent>
        <Faq />
      </PageContent>
      <Footer />
    </main>
  )
}
