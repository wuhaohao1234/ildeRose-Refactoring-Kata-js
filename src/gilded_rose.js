// const BackstagePass = require('./items/backstage-pass')

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  static createBackstagePass(sellIn, quality) {
    return new BackstagePass(sellIn, quality)
  }
  static createSulfuras(sellIn, quality) {
    return new Sulfuras(sellIn, quality)
  }
  static createAgeBire(sellIn, quality) {
    return new AgeBire(sellIn, quality)
  }
  static createNormalItem(name, sellIn, quality) {
    return new Item(name, sellIn, quality)
  }
  isBoolAgedBire() {
    return true
  }
  isBoolBackstagePass() {
    return this.name != 'Backstage passes to a TAFKAL80ETC concert'
  }
  isBoolSulfuras() {
    return true
  }
  passOneDay() {
    this.updateQuality();
    this.updateSellIn();
    if (this.isExpired()) {
      this.updateQualityAfterExpiration();
    }
  }
  increaseQulity() {
    this.quality = this.quality + 1;
  }
  decreaseQulity() {
    this.quality = this.quality - 1;
  }
  updateQuality() {
    if (!this.isBoolAgedBire() || !this.isBoolBackstagePass()) { 
      if(this.quality >= 50) {
        return
      }
      this.increaseQulity()
      if(this.isBoolBackstagePass()) {
        return
      }
      if(this.sellIn >= 11) {
        return
      }
      if(this.quality >= 50) {
        return
      }
      this.increaseQulity()
      if(this.sellIn >= 6) {
        return
      }
      if(this.quality >= 50) {
        return
      }
      this.increaseQulity()
      return
    }
    if (this.quality <= 0) {
      return
    }
    if(!this.isBoolSulfuras()) {
      return
    }
    this.decreaseQulity()
  }

  updateQualityAfterExpiration() {
    if(this.isBoolAgedBire()) {
      return
    }
    if (this.quality < 50) {
      this.increaseQulity()
    }
    if(!this.isBoolBackstagePass()) {
      this.quality = this.quality - this.quality;
      return
    }
    if(this.quality <= 0) {
      return
    }
    if (this.isBoolSulfuras()) {
      this.decreaseQulity()
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
class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
  }
  isBoolBackstagePass() {
    return false
  }
}
class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super('Sulfuras, Hand of Ragnaros', sellIn, quality)
  }
  isBoolSulfuras() {
    return false
  }
}
class AgeBire extends Item {
  constructor(sellIn, quality) {
    super('Aged Brie', sellIn, quality)
  }
  isBoolAgedBire() {
    return false
  }
}

module.exports = {
  Item,
  Shop
}
