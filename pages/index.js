import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [companyDescription, setCompanyDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/generate-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyDescription }),
    });
    const data = await response.json();
    setResult(data.result.split('\n'));
    setLoading(false);
    setCompanyDescription('');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="flex flex-col md:w-1/2">
        <Head>
          <title>Generador de nombres para empresas</title>
        </Head>

        <div className="flex flex-col justify-center">
          <h3
            className="mb-4
          text-4xl
          font-extrabold
          leading-none
          tracking-tight
          md:text-5xl
          lg:text-6xl
          dark:text-white
          text-center
          ">
            Genera el nombre de tu empresa 💡
          </h3>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col justify-items-center mb-6">
              <label>Describe tu empresa</label>
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                rows="4"
                type="text"
                name="companyDescription"
                placeholder="Ingresa de que va tu empresa"
                value={companyDescription}
                onChange={e =>
                  setCompanyDescription(e.target.value)
                }></textarea>
            </div>
            <div className="flex flex-col justify-items-center mb-6">
              <input
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                value="Generar"
              />
            </div>
          </form>
          {loading ? (
            <div>
              <h3>Creando nombres 🧪💡</h3>
            </div>
          ) : (
            <ol>
              {result.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </main>
  );
}
