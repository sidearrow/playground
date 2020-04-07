import Handsontable from "handsontable";

const container = document.getElementById('companyTable');

new Handsontable(container, {
  data: ['aa', 'bb'], licenseKey: 'non-commercial-and-evaluation',
});
