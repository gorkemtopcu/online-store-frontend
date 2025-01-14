import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({ placeholder = "Search", value, onChange, onSearch }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onPressEnter={() => onSearch(value)}
      suffix={
        <Button
          type="link"
          icon={<SearchOutlined />}
          onClick={() => onSearch(value)}
        />
      }
    />
  );
};

export default SearchInput;
