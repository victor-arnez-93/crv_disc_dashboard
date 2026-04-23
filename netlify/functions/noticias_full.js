exports.handler = async () => {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://vocerh.abril.com.br/feed/"
    );

    const data = await res.json();

    if (!data.items) {
      return {
        statusCode: 200,
        body: JSON.stringify([])
      };
    }

    const noticias = data.items.slice(0, 5).map(item => ({
      titulo: item.title,
      resumo: item.description.replace(/<[^>]+>/g, "").slice(0, 140),
      link: item.link,
      fonte: "Você RH"
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(noticias)
    };

  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify([])
    };
  }
};