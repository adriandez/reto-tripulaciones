import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';

const IosSwitchStyle = () => {
  const [toggled, setToggled] = React.useState(false);
  const iosStyles = useIosSwitchStyles();
  return (
    <div>
      <Switch
        classes={iosStyles}
        checked={toggled}
        onChange={e => setToggled(e.target.checked)}
      />
      <Switch
        classes={iosStyles}
        checked={!toggled}
        onChange={e => setToggled(!e.target.checked)}
      />
    </div>
  );
};

export default IosSwitchStyle;