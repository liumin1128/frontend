import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';


/* eslint-disable no-case-declarations */


const styles = theme => ({
  container: {
    maxWidth: 1000,
    margin: '100px auto',
    // border: '1px red solid',
  },
  day: {
    width: `${100 / 15}%`,
    display: 'inline-block',
    textAlign: 'center',
    padding: 2,
  },
  item: {
    display: 'inline-block',
    // width: `${100 / 7}%`,
    // border: '1px red solid',
    padding: '8px 0',
    height: 60,
    // background: 'green',
    // transition: '1s',
    background: '#f1f1f1',
    margin: 2,
    // borderRadius: 2,
    fontSize: 10,
    color: '#999',
    '&:hover': {
      boxShadow: '0 0 1px #333',
    },
  },
  active: {
    background: '#00B9F7',
    // transition: 'none',
    color: '#333',
  },
  ripple: {
    background: '#00B9F7',
  },
});

@connect(({ book }) => ({ ...book.setting }))
@withStyles(styles)
export default class Index extends PureComponent {
  state = {
    // {days: 7, startOfDay: 8, endOfDay: 17, multi: true, title: "1212121"},
    // days: list.map(i => ({ key: i, label: `${i} 七月`, active: false })),
    // days: new Array(7)
    //   .fill('x')
    //   .map((i, index) => index),
    // type: 'day',
    type: '60min',
    // type: '30min',
    // type: '15min',
    values: {
      1531497600: [7],
    },

    xyTemp: {},

    // timeRange: 60,
  }

  onSelect = ({ day, start, end, idx, active }) => {
    // const { days } = this.state;
    // const idx = days.findIndex(i => i.key === key);
    // days[idx].active = !days[idx].active;
    // this.setState({
    //   days: [...days],
    // });

    console.log(day, idx, active);

    const { values } = this.state;

    if (active) {
      const index = values[day].findIndex(i => i === idx);
      values[day].splice(index, 1);
      if (values[day].length === 0) delete values[day];
    } else {
      if (!values[day]) {
        values[day] = [];
      }
      const index = values[day].findIndex(i => i > idx);
      // console.log(index);
      if (index === -1) {
        values[day].push(idx);
      } else {
        values[day].splice(index, 0, idx);
      }
    }

    this.setState({
      values: { ...values },
    });
  }

  onMutiSelectStart = (x, y) => {
    // 获取多选开始坐标并记录
    // console.log(x, y);
    this.setState({
      xyTemp: { x, y },
    });
  }

  onMutiSelectEnd = (_x, _y) => {
    // 获取多选开始坐标）
    const { xyTemp: { x, y } } = this.state;
    // console.log(x, y);

    // 如果检测到开始坐标与结束坐标一致，则该事件已在点击事件中处理，这边忽略即可
    if (x === _x && y === _y) return;

    // 由于不知道用户选择的方向性，故默认较将小的作为开始点
    let x0;
    let y0;
    let x1;
    let y1;

    if (x < _x) {
      x0 = x;
      x1 = _x;
    } else {
      x0 = _x;
      x1 = x;
    }

    if (y < _y) {
      y0 = y;
      y1 = _y;
    } else {
      y0 = _y;
      y1 = y;
    }

    // 至此得到了矩形左上角 => 右下角的两个坐标
    console.log(x0, y0, x1, y1);

    const { values } = this.state;

    // 在一个二维循环中对数值进行操作
    for (let i = 0; i <= x1 - x0; i += 1) {
      const startX = parseInt(moment().add(x0 + i, 'days').startOf('day').format('X'), 0);
      for (let j = 0; j <= y1 - y0; j += 1) {
        // values[startX].push();
        if (!values[startX]) values[startX] = [];
        const isSelected = values[startX].findIndex(d => d === y0 + j);
        if (isSelected === -1) {
          // console.log(index);
          const value = y0 + j;
          const index = values[startX].findIndex(d => d > value);

          if (index === -1) {
            values[startX].push(value);
          } else {
            values[startX].splice(index, 0, value);
          }
          values[startX].push();
        }
      }
    }

    // 保存数据并清空开始坐标
    this.setState({
      values: { ...values },
      xyTemp: {},
    });
  }

  render() {
    const { type, values } = this.state;
    const { classes, days: _days, timeRange, startOfDay, endOfDay } = this.props;

    const days = new Array(_days)
      .fill('x')
      .map((i, index) => index);

    return (
      <Fragment>
        {JSON.stringify(values, 0, 2)}
        {(() => {
          switch (type) {
            case 'day':
              return (
                <div className={classes.container}>
                  {
                  days.map(i => (
                    <ButtonBase
                      className={classes.item + (i.active ? ` ${classes.active}` : '')}
                      onClick={() => {
                        this.onSelect(i.key);
                      }}
                      TouchRippleProps={{
                        classes: {
                          child: classes.ripple,
                        },
                      }}
                    >
                      {i.label}
                    </ButtonBase>
                  ))
                }
                </div>
              );
            default:
              const temp = [];
              // 最小时间颗粒
              const interval = timeRange * 60;
              // 填充最小时间颗粒
              for (let i = 0; i < 60 * 24 / timeRange; i += 1) {
                // 最小时间颗粒的起始值
                const start = i * interval;
                // 最小时间颗粒的结束值
                const end = start + interval;

                if (start >= startOfDay * 60 * 60 && end <= (endOfDay + 1) * 60 * 60) {
                  // 如果时间点在可选范围以外，则不填充
                  temp.push({
                    idx: i,
                    // 显示字符
                    label: i,
                    start,
                    end,
                  });
                }
              }


              return (
                <div className={classes.container}>
                  {
                    days.map((i, dayIndex) => (
                      <div className={classes.day}>
                        {i}
                        {' '}
                        日
                        {temp.map((j, timeIndex) => {
                          // console.log(values);

                          const dayX = parseInt(moment().add(dayIndex, 'days').startOf('day').format('X'), 0);


                          const valueList = values[dayX] || [];
                          // console.log(valueList);

                          const active = valueList.findIndex((v) => { return j.idx === v; }) !== -1;
                          return (
                            <ButtonBase
                              className={classes.item + (active ? ` ${classes.active}` : '')}
                              onClick={() => {
                                this.onSelect({ day: dayX, start: j.start, end: j.end, idx: j.idx, active });
                              }}
                              style={{ width: '100%', height: 32 }}
                              TouchRippleProps={{
                                classes: {
                                  child: classes.ripple,
                                },
                              }}
                              onMouseDown={() => {
                                // console.log(dayIndex, timeIndex);
                                this.onMutiSelectStart(dayIndex, timeIndex);
                              }}
                              onMouseUp={() => {
                                // console.log(dayIndex, timeIndex);
                                this.onMutiSelectEnd(dayIndex, timeIndex);
                              }}
                            >
                              {
                                moment()
                                  .startOf('day')
                                  .second(j.start)
                                  .format('hh:mm a')
                              }

                            </ButtonBase>
                          );
                        })}

                      </div>

                    ))
                  }
                </div>
              );
          }
        })()}

      </Fragment>
    );
  }
}
