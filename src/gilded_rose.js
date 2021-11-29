class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  static createBackstagePass(sellIn, quality) {
    return new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
  }
  static createSulfuras(sellIn, quality) {
    return new Item('Sulfuras, Hand of Ragnaros', sellIn, quality)
  }
  static createAgeBire(sellIn, quality) {
    return new Item('Aged Brie', sellIn, quality)
  }
  static createNormalItem(name, sellIn, quality) {
    return new Item(name, sellIn, quality)
  }
  isBoolAgedBire() {
    return this.name != 'Aged Brie'
  }
  isBoolBackstagePass() {
    return this.name != 'Backstage passes to a TAFKAL80ETC concert'
  }
  isBoolSulfuras() {
    return this.name != 'Sulfuras, Hand of Ragnaros'
  }
  passOneDay() {
    this.updateQuality();
    this.updateSellIn();
    if (this.isExpired()) {
      this.updateQualityAfterExpiration();
    }
  }

  updateQuality() {
    if (this.isBoolAgedBire() && this.isBoolBackstagePass()) {
      if (this.quality > 0) {
        if (this.isBoolSulfuras()) {
          this.quality = this.quality - 1;
        }
      }
    } else {
      if (this.quality < 50) {
        this.quality = this.quality + 1;
        if (!this.isBoolBackstagePass()) {
          if (this.sellIn < 11) {
            if (this.quality < 50) {
              this.quality = this.quality + 1;
            }
          }
          if (this.sellIn < 6) {
            if (this.quality < 50) {
              this.quality = this.quality + 1;
            }
          }
        }
      }
    }
  }

  updateQualityAfterExpiration() {
    if (this.name != 'Aged Brie') {
      if (this.isBoolBackstagePass()) {
        if (this.quality > 0) {
          if (this.isBoolSulfuras()) {
            this.quality = this.quality - 1;
          }
        }
      } else {
        this.quality = this.quality - this.quality;
      }
    } else {
      if (this.quality < 50) {
        this.quality = this.quality + 1;
      }
    }
  }

  isExpired() {
    return this.sellIn < 0;
  }

  updateSellIn() {
    if (this.isBoolSulfuras()) {
      this.sellIn = this.sellIn - 1;
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  passOneDay() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].passOneDay()
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
