import React, { Component } from 'react';
import moment from 'moment';

export default class FundReturn extends Component {
  render() {

    let {fund} = this.props;
    console.log( moment(fund.sanctionedDate).format('DD-MM-YYYY'), moment(fund.sanctionedDate).month(), moment(fund.sanctionedDate).date(), moment(fund.sanctionedDate).year() );

    let dueDays = (moment().daysInMonth() - moment().date()) + 7;
    let dueDate = moment().add(dueDays, 'days').format('DD-MM-YYYY');
    let nextReqMonth = moment(fund.requestedDate).month();
    console.log(moment(fund.requestedDate).daysInMonth(), moment(fund.requestedDate).add(1, 'months').daysInMonth());

    if( fund.status == 'FUND_REQUESTED' ) {
      return(
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col m2 s1"></div>
              <div className="col m8 s10 card fund-request-received-container z-depth-5">
                <h5> Your fund request received. Will be processed soon.. </h5>
              </div>
              <div className="col m2 s1"></div>
            </div>
          </div>
        </div>
      )
    }

    if( fund.status == 'FUND_PROCESSED' ) {
      return(
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col m2 s1"></div>
              <div className="col m8 s10 card fund-return-container z-depth-5">
                <h5> You have due amount of {fund.sanctionedAmount}. Please pay on/before {dueDate} to avoid fine. </h5>
              </div>
              <div className="col m2 s1"></div>
            </div>
          </div>
        </div>
      )
    }

    return(
      <div>
        FR
      </div>
    )

  }
}
