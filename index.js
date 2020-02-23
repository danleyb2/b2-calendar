import {LitElement, css, html} from 'lit-element';

/* eslint max-len: ["error", { "ignoreTemplateLiterals": true }]*/

class B2Calendar extends LitElement {
  static get properties() {
    return {
      selectedDate: {type: String},
      startDate: {type: String, attribute: 'start-date'},
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
    :host{
    
    box-sizing: border-box;
			font-size: 10px;
    
    
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			color: #333;
			font-size: 1.6rem;
			background-color: #FAFAFA;
			-webkit-font-smoothing: antialiased;
    
    
    }
    
    
    
        #v-cal *, #v-cal :after, #v-cal :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

#v-cal {
    background-color: #fff;
    border-radius: 0;
    border: 1px solid #e7e9ed;
    -webkit-box-shadow: 0 4px 22px 0 rgba(0, 0, 0, .05);
    box-shadow: 0 4px 22px 0 rgba(0, 0, 0, .05);
    margin: 0 auto;
    overflow: hidden;
    width: 100%
}

#v-cal .vcal-btn {
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-appearance: button;
    background: none;
    border: 0;
    color: inherit;
    cursor: pointer;
    font: inherit;
    line-height: normal;
    min-width: 27px;
    outline: none;
    overflow: visible;
    padding: 0;
    text-align: center
}

#v-cal .vcal-btn:active {
    border-radius: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(16, 152, 158, .1);
    box-shadow: 0 0 0 2px rgba(16, 152, 158, .1)
}

#v-cal .vcal-header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 19.2px 22.4px;
    padding: 1.2rem 1.4rem
}

#v-cal .vcal-header svg {
    fill: #10989e
}

#v-cal .vcal-header__label {
    font-weight: 700;
    text-align: center;
    width: 100%
}

#v-cal .vcal-week {
    background-color: #e7e9ed;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
}

#v-cal .vcal-week span {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 14.28%;
    flex: 0 0 14.28%;
    font-size: 19.2px;
    font-size: 1.2rem;
    font-weight: 700;
    max-width: 14.28%;
    padding: 19.2px 22.4px;
    padding: 1.2rem 1.4rem;
    text-align: center;
    text-transform: uppercase
}

#v-cal .vcal-body {
    background-color: rgba(231, 233, 237, .3);
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
}

#v-cal .vcal-body, #v-cal .vcal-date {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

#v-cal .vcal-date {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    border-radius: 0;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 14.28%;
    flex: 0 0 14.28%;
    max-width: 14.28%;
    padding: 19.2px 0;
    padding: 1.2rem 0
}

#v-cal .vcal-date--active {
    cursor: pointer
}

#v-cal .vcal-date--today {
    background-color: #10989e;
    color: #fff
}

#v-cal .vcal-date--selected {
    background-color: #e7e9ed;
    color: #333
}

#v-cal .vcal-date--disabled {
    border-radius: 0;
    cursor: not-allowed;
    opacity: .5
}
    `;
  }


  render() {
    return html`
		<div id="v-cal">
			<div class="vcal-header">
				<button class="vcal-btn" data-calendar-toggle="previous">
					<svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
					</svg>
				</button>

				<div class="vcal-header__label" data-calendar-label="month">
					March 2017
				</div>


				<button class="vcal-btn" data-calendar-toggle="next">
					<svg height="24" version="1.1" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
					</svg>
				</button>
			</div>
			<div class="vcal-week">
				<span>Mon</span>
				<span>Tue</span>
				<span>Wed</span>
				<span>Thu</span>
				<span>Fri</span>
				<span>Sat</span>
				<span>Sun</span>
			</div>
			<div class="vcal-body" data-calendar-area="month"></div>
		</div>`;
  }

  firstUpdated() {
    this.month= this.shadowRoot.querySelectorAll('[data-calendar-area="month"]')[0];
    this.next= this.shadowRoot.querySelectorAll('[data-calendar-toggle="next"]')[0];
    this.previous= this.shadowRoot.querySelectorAll('[data-calendar-toggle="previous"]')[0];
    this.label= this.shadowRoot.querySelectorAll('[data-calendar-label="month"]')[0];
    this.activeDates=null;

    if (this.startDate) {
      // Initial Calendar date
      this.date = new Date(this.startDate);
      this.todaysDate = new Date(this.startDate);
    } else {
      this.date = new Date();
      this.todaysDate = new Date();
    }

    this.options = {
      disablePastDays: true,
    };
    this.date.setDate(1);
    this.createMonth();
    this.createListeners();
  }

  createListeners() {
    var _this = this;
    this.next.addEventListener('click', function() {
      _this.clearCalendar();
      var nextMonth = _this.date.getMonth() + 1;
      _this.date.setMonth(nextMonth);
      _this.createMonth();
    });
    // Clears the calendar and shows the previous month
    this.previous.addEventListener('click', (evt) => {
      _this.clearCalendar();
      var prevMonth = _this.date.getMonth() - 1;
      _this.date.setMonth(prevMonth);
      _this.createMonth();
    });
  }
  createDay(num, day, year) {
    var newDay = document.createElement('div');
    var dateEl = document.createElement('span');
    dateEl.innerHTML = num;
    newDay.className = 'vcal-date';
    newDay.setAttribute('data-calendar-date', this.date);

    // if it's the first day of the month
    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = (6 * 14.28) + '%';
      } else {
        newDay.style.marginLeft = ((day - 1) * 14.28) + '%';
      }
    }
    if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
      newDay.classList.add('vcal-date--disabled');
    } else {
      newDay.classList.add('vcal-date--active');
      newDay.setAttribute('data-calendar-status', 'active');
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('vcal-date--today');
    }

    newDay.appendChild(dateEl);
    this.month.appendChild(newDay);
  }
  dateClicked() {
    var _this = this;
    this.activeDates = this.shadowRoot.querySelectorAll(
      '[data-calendar-status="active"]'
    );
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].addEventListener('click', (event) => {
        // var picked = this.shadowRoot.querySelectorAll('[data-calendar-label="picked"]')[0];
        // picked.innerHTML = this.dataset.calendarDate;
        // console.log(this.dataset.calendarDate);
        this.selectedDate = event.currentTarget.dataset.calendarDate;
        console.log(this.selectedDate);
        _this.removeActiveClass();
        event.currentTarget.classList.add('vcal-date--selected');
      });
    }
  }

  createMonth() {
    var currentMonth = this.date.getMonth();
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear()
      );
      this.date.setDate(this.date.getDate() + 1);
    }
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1);
    this.date.setMonth(this.date.getMonth() - 1);
    this.label.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
    this.dateClicked();
  }

  monthsAsString(monthIndex) {
    return [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][monthIndex];
  }

  clearCalendar() {
    this.month.innerHTML = '';
  }

  removeActiveClass() {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove('vcal-date--selected');
    }
  }
}

customElements.define('b2-calendar', B2Calendar);
