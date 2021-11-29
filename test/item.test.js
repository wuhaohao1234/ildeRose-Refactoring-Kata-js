const { Item } = require("../src/gilded_rose")

describe('test Item', () => {
  it('', () => {
    const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20) 
    item.passOneDay()
    expect(item.quality).toEqual(21)
    item.passOneDay()
    expect(item.quality).toEqual(23)
  })

})
