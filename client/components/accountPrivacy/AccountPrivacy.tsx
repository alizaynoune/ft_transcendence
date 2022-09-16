import style from "./accountPrivacy.module.css";
import { useState } from "react";
import { Checkbox, Select } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import Icon from "@ant-design/icons";

// Icons
import { EmailIcon, PhoneIcon, OffIcon } from "@/icons/index";

// const options = [
//     {lable: 'test', value: 'Disabled'},
//     {lable: '2', value: '2'}
// ]

const { Option } = Select;
const AccountPrivacy: React.FC = () => {
  const [hiddenPhone, setHiddenPhone] = useState(true);
  const [hiddenBirthday, setHiddenBirthday] = useState(true);
  const [hiddenEmail, setHiddenEmail] = useState(true);
  const [hiddenLocation, setHiddenLocation] = useState(true);
  const [towFAT, setTowFAT] = useState("Disabled");

  const onChange = (checkedValues: CheckboxValueType[]) => {
//console.log("checked = ", checkedValues);
  };

  const options = [
    {
      label: (
        <span>
          <Icon component={EmailIcon} style={{ fontSize: "120%" }} /> Email
        </span>
      ),
      value: "Email",
    },
    {
      label: (
        <span>
          <Icon component={PhoneIcon} style={{ fontSize: "120%" }} /> Phone
        </span>
      ),
      value: "Phone",
    },
    {
      label: (
        <span>
          <Icon component={OffIcon} style={{ fontSize: "120%" }} /> Disabled
        </span>
      ),
      value: "Disabled",
    },
  ];

  return (
    <div className={style.container}>
      <Checkbox
        checked={hiddenPhone}
        onChange={() => setHiddenPhone(!hiddenPhone)}
      >
        Hidden your Phone
      </Checkbox>
      <br />
      <Checkbox
        checked={hiddenBirthday}
        onChange={() => setHiddenBirthday(!hiddenBirthday)}
      >
        Hidden your BirthDay
      </Checkbox>
      <br />
      <Checkbox
        checked={hiddenEmail}
        onChange={() => setHiddenEmail(!hiddenEmail)}
      >
        hidden your Email
      </Checkbox>
      <br />
      <Checkbox
        checked={hiddenLocation}
        onChange={() => setHiddenLocation(!hiddenLocation)}
      >
        hidden your Location
      </Checkbox>
      <br />
      <Select
        placeholder="2FA"
        value={towFAT}
        optionFilterProp="children"
        options={options}
        onChange={(value) => setTowFAT(value)}
      />
    </div>
  );
};

export default AccountPrivacy;
