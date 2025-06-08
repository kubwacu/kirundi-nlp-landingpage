import { ChartLineInteractive } from "@/components/Chart";
import contributors from "@/data/contributors";
import Link from "next/link";

async function getOverviewData() {
  const res = await fetch(process.env.NEXT_PUBLIC_OVERVIEW_API_URL as string, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch overview data');
  }
  return res.json();
}

export default async function Home() {
  const { total_articles: totalArticles, article_counts: articleCounts } = await getOverviewData();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#1B483D]">
            Kirundi NLP
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An open initiative dedicated to collecting, cleaning, translating,
            and modeling Kirundi language data to support the development of
            high-quality Natural Language Processing (NLP) tools.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#1B483D]">Mission</h2>
            <p className="text-lg text-gray-700 italic">
              {`"To build the largest open-source Kirundi text dataset and the
              first 100% Burundian-made Kirundi ↔ English translation model."`}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#1B483D]">
              Objectives
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                Collect Kirundi texts from books, articles, official documents,
                proverbs, and manual entries
              </li>
              <li>Clean and format data for consistency and usability</li>
              <li>Create accurate Kirundi ↔ English parallel corpora</li>
              <li>Build a Kirundi translation model from scratch</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#1B483D]">
            Article Collection Progress
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Number of Kirundi articles collected and processed over time
          </p>
          <div className="max-w-4xl mx-auto">
            <ChartLineInteractive
              article_counts={articleCounts}
              total_articles={totalArticles}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Contributors</h2>
          <p className="text-center text-gray-600 mb-4">
            This work was made possible by the contributions of:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {contributors.map((contributor, index) => (
              <div key={index} className="text-center">
                <Link
                  href={contributor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-800 hover:text-[#1B483D] transition-colors"
                >
                  {contributor.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
