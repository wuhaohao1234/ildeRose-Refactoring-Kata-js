const { Shop, Item } = require("../src/gilded_rose");
const fs = require('fs')

const str = fs.readFileSync('./test/base_line.txt').toString()

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  it("log str equal base_line", function () {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
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
      gildedRose.updateQuality();
    }
    expect(log('')).toBe(str)
  });
});
