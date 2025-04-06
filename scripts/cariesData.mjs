export async function fetchCariesData(country) {
    const base = "https://ghoapi.azureedge.net/api/";
    const endpoints = {
      permanent: `ORALHEALTH_UNTREATEDCARIESPERMANENT`,
      deciduous: `ORALHEALTH_UNTREATEDCARIESDECIDUOUS`,
      fluoride: `ORALHEALTH_AFFORDABILITY_FLUORIDETOOTHPASTE`,
      sugar: `ORALHEALTH_SUGAR_AVAILABILITY`,
      dentists: `HWF_0010`,
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
