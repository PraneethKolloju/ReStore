import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";


interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
    return (
        <>
            <FormControl variant="outlined" component="fieldset">
                <FormLabel id="demo-radio-buttons-group-label">Filters</FormLabel>
                <RadioGroup onChange={onChange} value={selectedValue}
                >
                    {options.map(({ value, Label }) => (
                        <FormControlLabel value={value} control={<Radio />} label={Label} key={value} />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}