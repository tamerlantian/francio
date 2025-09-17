# FormSearchableSelector

A powerful, scalable searchable selector component for React Native applications that integrates seamlessly with React Hook Form and provides API-driven search functionality.

## Features

- 🔍 **Real-time search** with debouncing
- 🌐 **API integration** using existing HttpBaseRepository
- 📱 **Mobile-optimized** with smooth animations
- 🎯 **TypeScript support** with full type safety
- 🔄 **Flexible data handling** for different API response structures
- 🎨 **Consistent UI** following existing design patterns
- ⚡ **Performance optimized** with local and remote search options
- 🛠 **Highly configurable** with sensible defaults

## Components

### FormSearchableSelector
Base component with search functionality and modal interface.

### FormSearchableSelectorController
React Hook Form wrapper for seamless form integration.

### useSearchableSelector Hook
Custom hook for API data fetching and search logic.

## Quick Start

```tsx
import { FormSearchableSelectorController } from '@/src/shared/components/ui/form/FormSearchableSelectorController';
import { useSearchableSelector } from '@/src/shared/hooks/use-searchable-selector.hook';
import { COMMON_FIELD_MAPPINGS } from '@/src/shared/interfaces/searchable-selector.interface';

// In your component
const conductorSelector = useSearchableSelector({
  endpoint: 'conductores',
  ...COMMON_FIELD_MAPPINGS.CONDUCTOR,
  searchParam: 'search',
});

// In your JSX
<FormSearchableSelectorController
  control={control}
  name="conductorId"
  label="Conductor"
  options={conductorSelector.options}
  isLoading={conductorSelector.isLoading}
  isSearching={conductorSelector.isSearching}
  onSearch={conductorSelector.search}
  onRetry={conductorSelector.retry}
  rules={{ required: 'Debe seleccionar un conductor' }}
/>
```

## Configuration Options

### SearchableSelectorConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `endpoint` | `string` | - | **Required.** API endpoint for fetching data |
| `labelField` | `string` | - | **Required.** Field name to use as display label |
| `valueField` | `string` | - | **Required.** Field name to use as option value |
| `searchableFields` | `string[]` | - | Additional fields to include in search text |
| `searchEndpoint` | `string` | - | Separate endpoint for search operations |
| `searchParam` | `string` | `'search'` | Query parameter name for search term |
| `initialParams` | `object` | `{}` | Initial query parameters for all requests |
| `transformData` | `function` | - | Custom data transformation function |
| `minSearchLength` | `number` | `2` | Minimum characters to trigger search |
| `searchDebounceMs` | `number` | `300` | Debounce delay in milliseconds |

### Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | - | **Required.** Field label |
| `placeholder` | `string` | `'Seleccionar...'` | Selector placeholder text |
| `searchPlaceholder` | `string` | `'Buscar...'` | Search input placeholder |
| `options` | `SearchableOption[]` | - | **Required.** Available options |
| `onSearch` | `function` | - | Search function from hook |
| `isLoading` | `boolean` | `false` | Initial loading state |
| `isSearching` | `boolean` | `false` | Search loading state |
| `error` | `string` | - | Error message to display |
| `onRetry` | `function` | - | Retry function for failed requests |

## Common Field Mappings

Pre-configured mappings for common entity types:

```tsx
import { COMMON_FIELD_MAPPINGS } from '@/src/shared/interfaces/searchable-selector.interface';

// Available mappings:
COMMON_FIELD_MAPPINGS.ID_NAME      // { labelField: 'name', valueField: 'id' }
COMMON_FIELD_MAPPINGS.ID_TITLE     // { labelField: 'title', valueField: 'id' }
COMMON_FIELD_MAPPINGS.USER         // User entities with full_name, email, username
COMMON_FIELD_MAPPINGS.CONDUCTOR    // Conductor entities
COMMON_FIELD_MAPPINGS.VEHICLE      // Vehicle entities
COMMON_FIELD_MAPPINGS.LOCATION     // Location entities
```

## Usage Examples

### Basic Usage
```tsx
const basicSelector = useSearchableSelector({
  endpoint: 'users',
  ...COMMON_FIELD_MAPPINGS.USER,
});
```

### Custom Data Transformation
```tsx
const customSelector = useSearchableSelector({
  endpoint: 'vehicles',
  labelField: 'display_name',
  valueField: 'id',
  transformData: (data) => 
    data.map(item => ({
      label: `${item.placa} - ${item.modelo}`,
      value: item.id,
      searchableText: `${item.placa} ${item.modelo} ${item.chasis}`,
    })),
});
```

### Separate Search Endpoint
```tsx
const searchSelector = useSearchableSelector({
  endpoint: 'cities',
  searchEndpoint: 'cities/search',
  ...COMMON_FIELD_MAPPINGS.LOCATION,
  minSearchLength: 3,
});
```

### Local Filtering (No API Search)
```tsx
// Don't provide onSearch prop to use local filtering
<FormSearchableSelector
  label="Local Options"
  options={staticOptions}
  value={value}
  onValueChange={setValue}
  // No onSearch prop = local filtering
/>
```

## API Response Handling

The hook automatically handles different API response structures:

```tsx
// Direct array
[{ id: 1, name: "Item 1" }]

// Wrapped in data property
{ data: [{ id: 1, name: "Item 1" }] }

// Wrapped in results property
{ results: [{ id: 1, name: "Item 1" }] }

// Wrapped in items property
{ items: [{ id: 1, name: "Item 1" }] }
```

## Error Handling

The component provides comprehensive error handling:

- **Network errors**: Automatic retry functionality
- **Empty results**: Customizable empty state messages
- **Search errors**: Error display with retry option
- **Loading states**: Separate loading indicators for initial load and search

## Performance Considerations

- **Debounced search**: Prevents excessive API calls
- **Local filtering**: Option to filter locally without API calls
- **Memoized options**: Efficient re-rendering
- **Cleanup**: Proper timeout cleanup on unmount

## Integration with Existing Codebase

The component follows the existing architectural patterns:

- Uses `HttpBaseRepository` for API calls
- Follows the same styling patterns as `FormSelector`
- Integrates seamlessly with React Hook Form
- Uses existing error handling patterns
- Maintains consistent animation and UX patterns

## Best Practices

1. **Use common field mappings** when possible for consistency
2. **Set appropriate debounce times** (300ms is usually good)
3. **Provide meaningful error messages** for better UX
4. **Use separate search endpoints** for complex search logic
5. **Include searchableFields** for better search results
6. **Handle empty states** with appropriate messages

## Migration from FormSelector

Replace existing FormSelector usage:

```tsx
// Before
<FormSelectorController
  control={control}
  name="conductorId"
  label="Conductor"
  options={conductorOptions}
  isLoading={isLoadingConductors}
/>

// After
<FormSearchableSelectorController
  control={control}
  name="conductorId"
  label="Conductor"
  options={conductorSelector.options}
  isLoading={conductorSelector.isLoading}
  isSearching={conductorSelector.isSearching}
  onSearch={conductorSelector.search}
  onRetry={conductorSelector.retry}
/>
```
