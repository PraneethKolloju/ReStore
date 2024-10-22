import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
    onChange: (items: string[]) => void;
    brands: string[];
    checked?: string[];
}

export default function Checkboxes({ onChange, brands, checked }: Props) {

    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleClick(value: string) {
        let currentIndex = checkedItems.findIndex(i => i == value);
        let newChecked: string[] = [];
        if (currentIndex === -1) newChecked = [...checkedItems, value]
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }
    return (

        <>
            <FormGroup>
                {brands.map(brand => (
                    <FormControlLabel control={<Checkbox />}
                        label={brand}
                        onClick={() => handleClick(brand)}
                        checked={checkedItems.indexOf(brand) !== -1}
                    />
                ))}
            </FormGroup>
        </>
    )

}