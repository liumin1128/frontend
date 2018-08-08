import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';


/* eslint-disable no-case-declarations */


const styles = theme => ({
  container: {
    maxWidth: 1000,
    margin: '0 auto',
    // border: '1px red solid',
  },
  day: {
    // width: `${100 / 15}%`,
    display: 'inline-block',
    textAlign: 'center',
    // padding: 2,
    maxWidth: 100,
  },
  dayTitle: {
    color: '#666',
    padding: '16px 0',
    fontWeight: 700,
    // background: 'rgba(0,0,0,0.05)',
    borderBottom: '2px rgba(0,0,0,0.1) dashed',
    marginBottom: 16,
  },
  item: {
    display: 'inline-block',
    // width: `${100 / 7}%`,
    // border: '1px red solid',
    padding: '8px 0',
    height: 60,
    fontWeight: 400,
    // background: 'green',
    // transition: '1s',
    // background: '#f1f1f1',
    // margin: 2,
    // borderRadius: 2,
    fontSize: 10,
    color: '#999',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 0 0px 1px #d500f9',
      zIndex: 1,
      boxSizing: 'border-box',
      // background: '#f2f2f2',

    },
  },
  active: {
    background: '#00B9F7',
    // transition: 'none',
    color: '#fff',
  },
  ripple: {
    background: '#00B9F7',
  },
});

@connect(({ book }) => ({ ...book }))
@withStyles(styles)
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.times || {},
    };
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

    this.setValue({ ...values });
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
      const startX = moment().add(x0 + i, 'days').startOf('day').format('YYYY-MM-DD');
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
      xyTemp: {},
    });

    this.setValue({ ...values });
  }

  setValue = (values) => {
    this.setState({ values });
    const { onChange } = this.props;
    if (onChange) {
      onChange(values);
    }
  }

  render() {
    const { type, values } = this.state;
    const { classes, setting = {} } = this.props;

    // console.log('setting');
    // console.log(setting);

    const { startOfHour, endOfHour, startOfDay, endOfDay, timeRange, title } = setting;


    // const startOfDayOfYear = moment(startOfDay).dayOfYear()
    // const endOfDayOfYear = moment(endOfDay).dayOfYear()

    // const yearCha = moment(endOfDay) - moment(startOfDay)

    const _days = (moment(endOfDay) - moment(startOfDay)) / (1000 * 60 * 60 * 24) + 1;
    // console.log('_days');
    // console.log(_days);
    // console.log(_days);

    const days = new Array(_days)
      .fill('x')
      .map((i, index) => index);

    return (
      <Fragment>
        {
        //   <Typography variant="title" gutterBottom>
        //   活动：
        //   {title}
        // </Typography>
        // <Typography variant="subheading" gutterBottom>
        //   点击选择可用时间段，可以按住拖动来一次选择多个哦~
        // </Typography>
        }
        {
          // JSON.stringify(values, 0, 2)
        }
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

                if (start >= startOfHour * 60 * 60 && end <= (endOfHour + 1) * 60 * 60) {
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
                      <div
                        style={{
                          // width: 100
                          width: `${100 / _days}%`,
                        }}
                        className={classes.day}
                      >

                        <div className={classes.dayTitle}>
                          {moment(startOfDay).add(i, 'days').format('DD ddd')}
                        </div>
                        {temp.map((j, timeIndex) => {
                          // console.log(values);

                          const dayX = moment().add(dayIndex, 'days').startOf('day').format('YYYY-MM-DD');


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
                                // console.log(dayIndex, j.idx);
                                this.onMutiSelectStart(dayIndex, j.idx);
                              }}
                              onMouseUp={() => {
                                // console.log(dayIndex, j.idx);
                                this.onMutiSelectEnd(dayIndex, j.idx);
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
