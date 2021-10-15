const { Selector } = require("testcafe");
const { convertDate } = require("../utils/dates");

function select(selector) {
  return Selector(selector).with({ boundTestRun: testController });
}

// page attributes
const inputName = () => select('input[name="name"]');
const inputPageNumbers = () => select('input[name="pages"]');
const inputLanguage = () =>
  select(
    "div#Book div > div > div > div > span > div > div > div > ul > li > div > input"
  );
const selectDropDown = () => select(".ant-select-dropdown-menu-item");
const inputDate = () =>
  select("div.ant-calendar > div.ant-calendar-input-wrap > div > input");
const inputTypes = () =>
  select("div#Types div > div > div > div > div > span > div > div > div");
const saveButton = () => select("button#save");
const saveButtonExists = () => select("button#save").exists;
const cancelButton = () => select("button#cancel");

// page methods
async function fillName(value) {
  await testController.selectText(inputName());
  await testController.pressKey("backspace");
  await testController.typeText(inputName(), value);
}

async function fillPages(value) {
  await testController.selectText(inputPageNumbers());
  await testController.pressKey("backspace");
  await testController.typeText(inputPageNumbers(), value);
}

async function fillLanguage(value) {
  await testController.click(inputLanguage());
  await testController.selectText(inputLanguage());
  await testController.pressKey("backspace");
  await testController.typeText(inputLanguage(), value);
  await testController.click(selectDropDown().withText(value));
}

async function fillRegistrationDate(date) {
  await testController.click(selectDate());
  await testController.click(inputDate());
  await testController.selectText(inputDate());
  await testController.pressKey("backspace");
  await testController.typeText(inputDate(), convertDate(date));
}

async function checkSaveButton() {
  await testController.expect(saveButtonExists()).ok();
}

async function clickSaveButton() {
  await testController.click(saveButton());
}

async function clickCancelButton() {
  await testController.click(cancelButton());
}

async function validateFields(field, fieldValue) {
  switch (field) {
    case "name":
      await testController.expect(inputName().value).eql(fieldValue);
      break;
    case "pagesNumber":
      await testController.expect(inputPageNumbers().value).eql(fieldValue);
      break;
    case "language":
      await testController.expect(inputLanguage().value).eql(fieldValue);
      break;
    default:
      break;
  }
}

async function validateSort(total, datesOrder) {
  for (var i = 1; i < total; i++) {
    var next = i + 1;

    // Date
    if (type === nextType) {
      date = await selectRow(i, 4).innerText;
      date = date.split(" ~ ");
      dateConverted = Date.parse(convertDate(date[0]));

      nextDate = await selectRow(next, 4).innerText;
      nextDate = nextDate.split(" ~ ");
      nextDateConverted = Date.parse(convertDate(nextDate[0]));

      if (datesOrder === "descending") {
        await testController.expect(dateConverted >= nextDateConverted).ok();
      } else if (datesOrder === "ascending") {
        await testController.expect(dateConverted <= nextDateConverted).ok();
      }
    }
  }
}

async function changeBookPriority(row, position) {
  await testController.dragToElement(
    selectRow(row, "1"),
    selectRow(position, "1")
  ); // 1 = first column (drag and drop)
}

async function clickRow(position) {
  await testController.click(selectRow(position, "3")); // 3 = third column (icao)
}

async function checkBooksPriorities(row) {
  return await selectRow(row, "3").innerText;
}

async function fillMultiTypes(value) {
  const types = value.split(";");
  await testController.click(inputTypes());
  if (types.length > 0) {
    for (i = 0; i < types.length; i++) {
      await testController.click(selectDropDown().withText(types[i]));
    }
  } else {
    await testController.click(inputTypes());
  }
}

module.exports = {
  fillName,
  fillPages,
  fillLanguage,
  fillRegistrationDate,
  checkSaveButton,
  clickSaveButton,
  clickCancelButton,
  validateFields,
  validateSort,
  changeBookPriority,
  clickRow,
  checkBooksPriorities,
  fillMultiTypes,
};
