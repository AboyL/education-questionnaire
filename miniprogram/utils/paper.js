import { getExpertList } from '../servers/index'

// export const questionnaire = [
//   {
//     name: '问卷1',
//     questionList: [
//       {
//         question: '中国的首都是什么',
//         weight: 0.2
//       }, {
//         question: '美国的首都是什么',
//         weight: 0.2
//       }
//     ]
//   }, {
//     name: '问卷2',
//     questionList: [
//       {
//         question: '巴西的首都是什么',
//         weight: 0.3
//       }, {
//         question: '俄罗斯的首都是什么',
//         weight: 0.3
//       }
//     ]
//   }
// ]

export const questionnaire = [
  {
    name: '课程开发',
    questionList: [
      {
        question: '课程定位合理，符合中小学必修课程的要求',
        weight: 0.0041
      }, {
        question: '与其他学科课程存在相互补充、递进或延升的关系',
        weight: 0.0207
      }, {
        question: '课程目标符合中小学综合实践活动课程的总目标要求',
        weight: 0.0096
      }, {
        question: '课程目标具体清晰，便于操作',
        weight: 0.0042
      }, {
        question: '目标体现了对学生问题意识、创新意识、应用意识的培养',
        weight: 0.0110
      }
    ]
  }, {
    name: '课程方案',
    questionList: [
      {
        question: '课程内容贴近学生生活实际和发展需要',
        weight: 0.0398
      }, {
        question: '重点培养了学生的技能、思维方法、行为方式和价值观念',
        weight: 0.0133
      }, {
        question: '教学方法符合课程要求，符合学生的认知规律',
        weight: 0.0114
      }, {
        question: '运用多种方法和教学手段让学生主动参与综合实践活动的探究过程',
        weight: 0.0114
      }, {
        question: '指导学生理清知识思路，使得学生个性得到发展',
        weight: 0.0343
      }, {
        question: '课程场地、设施设备满足活动需要并且具有安全保障',
        weight: 0.0018
      }, {
        question: '有效的利用各种信息资源促进教学',
        weight: 0.0088
      }, {
        question: '能够有效的利用学生的背景信息进行指导教学',
        weight: 0.0018
      }
    ]
  }, {
    name: '课程实施',
    questionList: [
      {
        question: '课教学表达准确幽默，有驾驭活动的能力',
        weight: 0.1101
      }, {
        question: '能够尊重学生的不同见解，对学生探究时的困惑及时进行引导和反馈，妥善处理教学预设之外的情况',
        weight: 0.0338
      }, {
        question: '课程内容的开展具有吸引力、针对性和开放性，难度适中，整节课安排合理，活动环节紧凑，衔接自然',
        weight: 0.1020
      }, {
        question: '创设师生互相尊重的和谐气氛，给予学生一定的探究余地，学生兴趣浓厚',
        weight: 0.0201
      }, {
        question: '教学语言准确、生动、简练、教态自然大方',
        weight: 0.0415
      }, {
        question: '教学技能扎实，能够娴熟的运用各种教学设备',
        weight: 0.0493
      }, {
        question: '师生关系良好，互动交流频繁',
        weight: 0.1752
      }
    ]
  }, {
    name: '课程效果',
    questionList: [
      {
        question: '学生运用有关知识解决简单问题的能力，知识的应用意识、创新意识得到了提高',
        weight: 0.1367
      }, {
        question: '学生调查报告、考察报告、总结等成果规范，结构清晰，观点明确且有新意。',
        weight: 0.0371
      }, {
        question: '成果汇报或互动交流时，表达清晰，仪态大方',
        weight: 0.0168
      }, {
        question: '指导学生发现、探究、解决问题的能力得到了发展',
        weight: 0.0400
      }, {
        question: '改善活动过程，转换指导策略提供经验',
        weight: 0.0400
      }, {
        question: '在活动主题与方法等方面有一定的创新',
        weight: 0.0017
      }, {
        question: '课程条理清楚，课程教学目标达成度高',
        weight: 0.0136
      }, {
        question: '全班学生课程参与度高，不同学生的个性得以展现及发展',
        weight: 0.0070
      }, {
        question: '课堂气氛活跃，积累了课程教学经验',
        weight: 0.0029
      }
    ]
  }
]

const optionObj = {
  A: 90,
  B: 80,
  C: 70,
  D: 60,
}


export const getScore = (arr) => {
  // arr为二维数组
  let score = 0
  let scoreArr = []
  arr.forEach((item, index) => {
    let s = 0
    item.forEach((option, answerIndex) => {
      const r = (optionObj[option] * questionnaire[index].questionList[answerIndex].weight)
      s += r
    })
    scoreArr.push(s)
    score += s
  })
  return {
    score,
    scoreArr
  }
}

export const getExpertScore = async (key) => {
  const expertList = await getExpertList()
  let score = 0
  let expertScoeArr = []
  let outExpertScoeArr = []
  let len = 0
  expertList.data.forEach(expert => {
    if (expert && expert.questionnaire && expert.questionnaire[key]) {
      const e = getScore(expert.questionnaire[key])
      score += e.score
      expertScoeArr.push(e.scoreArr)
      len = Math.max(len, e.scoreArr.length)
    }

  })

  if (expertList.data.length) {
    score = score / expertList.data.length
    for (let i = 0; i < len; i++) {
      outExpertScoeArr[i] = 0
      expertScoeArr.forEach((s) => {
        outExpertScoeArr[i] += s[i] || 0
      })
      outExpertScoeArr[i] = outExpertScoeArr[i] / expertList.data.length
    }
  }
  return {
    score,
    expertScoeArr: outExpertScoeArr
  }
}
