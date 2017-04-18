/**
Copyright 2016 Autodesk,Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
import React from 'react';
import ReactDOM from 'react-dom';
import HIG, { Slot } from './react-hig-fiber';
import { Button, Menu } from './react-hig';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLabel: 'Hello HIG',
      fn: false,
      group1: true,
      group3: true
    };
  }

  handleChange = event => {
    const buttonLabel = event.target.value;
    this.setState(() => {
      return { buttonLabel };
    });
  };

  fn1 = () => this.setState({ fn: true });

  fn2 = () => this.setState({ fn: false });
  toggleGroup1 = () => this.setState({ group1: !this.state.group1 });

  toggleGroup3 = () => this.setState({ group3: !this.state.group3 });

  render() {
    const actualFn = this.state.fn ? this.fn2 : this.fn1;

    return (
      <div>
        <HIG>
          <hig-button>{this.state.buttonLabel}</hig-button>
          <hig-menu>
            <hig-menu-top onToggle={actualFn} />

            {this.state.group1 &&
              <Slot>
                <p>Some DOM Content! {this.state.buttonLabel}</p>
              </Slot>}

            <hig-sidebar open={this.state.fn}>
              {this.state.group1 &&
                <hig-sidebar-group>
                  <hig-sidebar-item>Group Above</hig-sidebar-item>
                </hig-sidebar-group>}

              <hig-sidebar-group small>
                <hig-sidebar-item onClick={this.toggleGroup1}>
                  Toggle Group Above
                </hig-sidebar-item>
                <hig-sidebar-item onClick={this.toggleGroup3}>
                  Toggle Group Below
                </hig-sidebar-item>
                <hig-sidebar-item onClick={actualFn}>
                  {this.state.buttonLabel}
                </hig-sidebar-item>
              </hig-sidebar-group>

              {this.state.group3 &&
                <hig-sidebar-group>
                  <hig-sidebar-item>Group Below</hig-sidebar-item>
                </hig-sidebar-group>}
            </hig-sidebar>

          </hig-menu>
        </HIG>
        <input
          type="text"
          value={this.state.buttonLabel}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
