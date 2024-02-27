import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faFutbol, faFlag, faPaw, faCar } from '@fortawesome/free-solid-svg-icons';

export const BOXES_TABLE = [
    {
        icon: <FontAwesomeIcon icon={faEarthAmericas} />,
        title: 'Państwa'
    },
    {
        icon: <FontAwesomeIcon icon={faFutbol} />,
        title: 'Piłka nożna',
    },
    {
        icon: <FontAwesomeIcon icon={faFlag} />,
        title: 'Flagi',
    },
    {
        icon: <FontAwesomeIcon icon={faPaw} />,
        title: 'Zwierzęta',
    },
    {
        icon: <FontAwesomeIcon icon={faCar} />,
        title: 'Samochody',
    }
]