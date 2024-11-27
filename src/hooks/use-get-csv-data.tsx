export default async function getCSVData() {
  try {
    const target =
      "https://docs.google.com/spreadsheets/d/1RpgTIO6Bub0tekW1KuvSNnyDjRZBQcdqLPm4qEDnnbs/gviz/tq?tqx=out:csv";

    const res = await fetch(target, {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
      },
    });

    if (res.status === 200) {
      const data = await res.text();
      return data;
    } else {
      console.log(`Error code ${res.status}`);
    }
  } catch (err) {
    console.log(err);
  }
}
