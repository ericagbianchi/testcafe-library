var fs = require('fs');

try {
  var original_report = fs.readFileSync('./reports/report.json', { encoding: 'utf8' });
  var rerun_report = fs.readFileSync('./reports/report_rerun.json', { encoding: 'utf8' });
  
  const orig_rep_json = JSON.parse(original_report);
  const rerun_rep_json = JSON.parse(rerun_report);
  
  let dict = {};

  rerun_rep_json.forEach(item => {
    dict[item.id] = "passed"
    item.elements.forEach(item2 => {
      item2.steps.forEach(item3 => {
        if (item3.result.status == "failed" || item3.result.status == "skipped")
          dict[item.id] = "failed";
      });
    });
  });

  orig_rep_json.forEach(item => {
    item.elements.forEach(item2 => {
      item2.steps.forEach(item3 => {
        if (dict[item.id]) {
          item3.result.status = dict[item.id]
        }
      });
    });
  });
  
  fs.writeFileSync('reports/report.json', JSON.stringify(orig_rep_json));
} catch (objError) {
  if (objError instanceof SyntaxError) {
      if (objError.message != "Unexpected end of JSON input")
        console.error(objError)
  } else {
      console.error(objError);
  }
}