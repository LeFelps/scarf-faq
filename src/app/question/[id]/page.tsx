import PageContent from "@/components/layout/content";
import PageTitle from "@/components/layout/page-title";
import Navbar from "@/components/navbar";
import QuestionForm from "@/components/question/form";

export default function ChangeQuestion({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <PageContent>
        <PageTitle title="Editar pergunta" returnButton />
        <QuestionForm id={params.id} />
      </PageContent>
    </>
  )
}
