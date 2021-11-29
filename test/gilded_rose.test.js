const { Shop, Item } = require("../src/gilded_rose");
const fs = require('fs')

const str = fs.readFileSync('./test/base_line.txt').toString()

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.passOneDay();
    expect(items[0].name).toBe("foo");
  });
  it("log str equal base_line", function () {
    const items = [
      Item.createNormalItem("+5 Dexterity Vest", 10, 20),
      Item.createAgeBire(2, 0),
      Item.createNormalItem("Elixir of the Mongoose", 5, 7),
      Item.createSulfuras(0, 80),
      Item.createSulfuras(-1, 80),
      Item.createBackstagePass(15, 20),
      Item.createBackstagePass(10, 49),
      Item.createBackstagePass(5, 49),

      // This Conjured item does not work properly yet
      Item.createNormalItem("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    let logStr = ''

    const log = (str) => {
      logStr += str + '\n'
      return logStr
    }

    log("OMGHAI!");
    for (let day = 0; day < days; day++) {
      log(`\n-------- day ${day} --------`);
      log("name, sellIn, quality");
      items.forEach(item => log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.passOneDay();
    }
    expect(log('')).toBe(str)
  });
});
