import React, {useEffect} from 'react';
import { signal, computed } from "@preact/signals-core";

interface IProps {}

interface IPage {
  data: {
    animals: any
  },
  computed: {
    activeAnimals: any
  },
  filters: {},
  methods: {}
}

export const usePage = (props: IProps) => {
  const Page: IPage = {
    data: {
      animals: signal([])
    },
    computed: {
      activeAnimals: computed(() => Page.data.animals.filter((animal: any) => animal.active))
    },
    filters: {},
    methods: {}
  };

  return {
    ...Page.data,
    ...Page.computed,
    ...Page.filters,
    ...Page.methods
  };
};

