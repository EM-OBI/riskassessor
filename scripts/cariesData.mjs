export async function fetchCariesData(country) {
    const base = "https://api.allorigins.win/raw?url=https://ghoapi.azureedge.net/api/";
    const endpoints = {
      permanent: `ORALHEALTH_UNTREATEDCARIESPERMANENT`, //Prevalence of untreated caries of permanent teeth in people 5+ years
      deciduous: `ORALHEALTH_UNTREATEDCARIESDECIDUOUS`, //Prevalence of untreated caries of deciduous teeth in children 1-9 years
      fluoride: `ORALHEALTH_AFFORDABILITY_FLUORIDETOOTHPASTE`, //Affordability of fluoride toothpaste
      sugar: `ORALHEALTH_SUGAR_AVAILABILITY`, //Oral health: Per capita availability of sugar (g/day)
      dentists: `HWF_0010`, //Dentists (per 10,000)
    };
  
    const queries = Object.entries(endpoints).map(async ([key, endpoint]) => {
      const url = `${base}${endpoint}?$filter=SpatialDim eq '${country}'`;
      const res = await fetch(url);
      const json = await res.json();
      return { [key]: json.value };
    });
  
    const results = await Promise.all(queries);
    return results.reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }
