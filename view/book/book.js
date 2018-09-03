import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@/components/snackbar';


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
    color: '#ddd',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 0 0px 1px #d500f9',
      zIndex: 1,
      boxSizing: 'border-box',
      // background: '#f2f2f2',

    },
  },
  canuse: {
    color: '#333',
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
    // console.log('day, start, end, idx, active');
    // console.log(day, start, end, idx, active);
    const { values } = this.state;
    if (!values[day]) {
      values[day] = [];
    }

    if (active) {
      const index = values[day].findIndex(i => i === idx);
      values[day].splice(index, 1);
      if (values[day].length === 0) delete values[day];
    } else {
      if (!values[day]) {
        values[day] = [];
      }

      // 如果前面两个被连续预订，则无法预订
      if (values[day].findIndex(i => i === (idx - 1)) !== -1
        && values[day].findIndex(i => i === (idx - 2)) !== -1) {
        Snackbar.error('无法连续预订3个以上的时间点');
        return;
      }

      const index = values[day].findIndex(i => i > idx);
      if (index === -1) {
        values[day].push(idx);
      } else {
        values[day].splice(index, 0, idx);
      }
    }

    this.setValue({ ...values });
    return false;
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

    const { startOfHour, endOfHour, startOfDay, endOfDay, timeRange, times } = setting;

    const _days = (moment(endOfDay) - moment(startOfDay)) / (1000 * 60 * 60 * 24) + 1;

    const days = new Array(_days)
      .fill('x')
      .map((i, index) => index);


    const canuseList = JSON.parse(times);

    // console.log('canuseList');
    // console.log(canuseList);


    return (
      <Fragment>

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
                          // console.log(canuseList);

                          let canuse;
                          let active;
                          const dayX = moment(startOfDay).add(dayIndex, 'days').startOf('day').format('YYYY-MM-DD');

                          // 排除开始日期以前的日期
                          if (moment(startOfDay).add(dayIndex, 'days').startOf('day').format('x') < moment().startOf('day').format('x')) {
                            active = false;
                            canuse = false;
                          } else {
                            const canList = canuseList[dayX] || [];
                            canuse = canList.findIndex((v) => { return j.idx === v; }) !== -1;

                            const valueList = values[dayX] || [];
                            active = valueList.findIndex((v) => { return j.idx === v; }) !== -1;
                          }


                          // console.log('canuseList');
                          // console.log(canuseList);

                          // console.log('valueList');
                          // console.log(valueList);
                          return (
                            <ButtonBase
                              disabled={!canuse}
                              className={classes.item + (canuse ? ` ${classes.canuse}` : '') + (active ? ` ${classes.active}` : '')}
                              onClick={() => {
                                this.onSelect({ day: dayX, start: j.start, end: j.end, idx: j.idx, active });
                              }}
                              style={{ width: '100%', height: 32 }}
                              TouchRippleProps={{
                                classes: {
                                  child: classes.ripple,
                                },
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
