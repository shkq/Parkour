const { ccclass, property } = cc._decorator;

@ccclass
export default class Index extends cc.Component {

  @property(cc.Prefab)
  blockPrefab: cc.Prefab = null

  @property(cc.Node)
  foregroundNode: cc.Node = null

  templateQueue: cc.Node[] = []
  blockPool: cc.NodePool = new cc.NodePool('block')
  wave: number = 0
  templateHeight: number = 1334
  speed: number = 10
  createBlockFlag: number = 0

  start() {
    let initCount = 6

    for (let i = 0; i < initCount; ++i) {
      this.blockPool.put(cc.instantiate(this.blockPrefab))
    }

    this.createNewBlock()
    this.createNewBlock()
    this.createNewBlock()
    this.createNewBlock()
  }

  createNewBlock() {
    const block = this.blockPool.get()
    block.y = this.templateHeight * (this.wave - 2)
    block.x = 0
    block.parent = this.foregroundNode
    this.templateQueue.push(block)

    if (this.wave > 5) {
      const reuseNode = this.templateQueue.shift()
      this.blockPool.put(reuseNode)
    }

    this.wave++
  }

  update () {
    this.foregroundNode.y -= this.speed
    this.createBlockFlag += this.speed

    if (this.createBlockFlag > this.templateHeight) {
      this.createNewBlock()
      this.createBlockFlag = 0
    }
  }
}
