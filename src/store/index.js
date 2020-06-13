import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [
      {
        code: "account-1",
        name: "Saving",
        totalAmount: 0,
        info: [
          {
            id: "0-0",
            name: "Ahorro1",
            category: "transfer",
            amount: "1000",
            type: "income",
            date: "2020-06-11"
          },
          {
            id: "0-1",
            name: "Ahorro2",
            category: "other",
            amount: "321",
            type: "expense",
            date: "2020-06-11"
          },
          {
            id: "0-2",
            name: "Ahorro3",
            category: "transfer",
            amount: "123",
            type: "income",
            date: "2020-06-12"
          },
          {
            id: "0-3",
            name: "Ahorro4",
            category: "other",
            amount: "456",
            type: "expense",
            date: "2020-06-12"
          }
        ]
      },
      {
        code: "account-2",
        name: "Clients",
        totalAmount: 0,
        info: [
          {
            id: "1-0",
            name: "Books",
            category: "transfer",
            amount: "234",
            type: "income",
            date: "2020-06-10"
          },
          {
            id: "1-1",
            name: "Salary",
            category: "other",
            amount: "10000",
            type: "income",
            date: "2020-06-11"
          },
          {
            id: "1-2",
            name: "Desk",
            category: "transfer",
            amount: "123",
            type: "income",
            date: "2020-06-12"
          },
          {
            id: "1-3",
            name: "Chair",
            category: "other",
            amount: "456",
            type: "expense",
            date: "2020-06-13"
          }
        ]
      },
      {
        code: "account-3",
        name: "Enterprise",
        totalAmount: 0,
        info: []
      }
    ],
    categories: [
      { code: "cat-1", type: "income", name: "transfer" },
      { code: "cat-2", type: "income", name: "other" },
      { code: "cat-3", type: "expense", name: "transfer" },
      { code: "cat-4", type: "expense", name: "other" }
    ]
  },
  actions: {
    addCategory({ commit }, category) {
      commit("mutateCategoryList", category);
    },
    addTransfer({ commit }, transfer) {
      //student.name = student.name + "-inserted";
      commit("mutateTransfertList", transfer);
    },
    updateTransfer({ commit }, updated) {
      //student.name = student.name + "-inserted";
      commit("mutateUpdate", updated);
    },
    createAccount({ commit }, accountCreated) {
      commit("mutateCreateAccount", accountCreated);
    },
    updateAccount({ commit }, accountUpdated) {
      commit("mutateUpdateAccount", accountUpdated);
    },
    deleteAccount({ commit }, accountDeleted) {
      commit("mutateDeleteAccount", accountDeleted);
    },
    addMovement({ commit }, newMovemment) {
      commit("addMovement", newMovemment);
    },
    updateMovement({ commit }, updatedMovemment) {
      commit("updateMovement", updatedMovemment);
    },
    deleteMovement({ commit }, deletedMovemment) {
      commit("deleteMovement", deletedMovemment);
    },
    updateAccountBudget({ commit }, updatedAmountObject) {
      commit("updateAccountBudget", updatedAmountObject);
    }
  },

  mutations: {
    mutateTransfertList(state, transfer) {
      state.accounts.info.push(transfer);
    },
    mutateUpdate(state, upTransfer) {
      let upload;
      state.accounts.info.find(trans => trans.name === upTransfer.name);
      upload = state.accounts.info.indexOf(this.trans);
      if (this.trans !== null) {
        state.accounts.info.splice(upload, 1, upTransfer);
      }
    },
    mutateCategoryList(state, category) {
      state.categories.push(category);
    },
    mutateCreateAccount(state, account) {
      var aux = state.accounts[state.accounts.length - 1].code.split("-");
      var aux2 = Number(aux[1]) + 1;
      account.code = "account-" + aux2;
      state.accounts.push(account);
    },
    mutateUpdateAccount(state, codeName) {
      const foudAccountIndex = state.accounts.findIndex(
        account => account.code === codeName.code
      );
      state.accounts[foudAccountIndex].name = codeName.name;
    },
    mutateDeleteAccount(state, code) {
      const foudAccountIndex = state.accounts.findIndex(
        account => account.code === code
      );
      if (state.accounts[foudAccountIndex].info.length === 0) {
        state.accounts = state.accounts.filter(
          account1 => account1.code !== code
        );
      } else {
        alert("Can't delete this account");
      }
    },
    addMovement(state, newMovement) {
      state.accounts[newMovement.index].info.push({
        id: newMovement.id,
        name: newMovement.name,
        category: newMovement.category,
        amount: newMovement.amount,
        type: newMovement.type,
        date: newMovement.date

        //PABLO TRANSFER
      });
    },
    updateMovement(state, updatedMovement) {
      const foundAccountIndex = state.accounts[
        updatedMovement.index
      ].info.findIndex(account => account.id === updatedMovement.id);
      state.accounts[updatedMovement.index].info[foundAccountIndex] = {
        id: updatedMovement.id,
        name: updatedMovement.name,
        category: updatedMovement.category,
        amount: updatedMovement.amount,
        type: updatedMovement.type
      };
    },
    deleteMovement(state, deletedMovement) {
      state.accounts[deletedMovement.index].info = state.accounts[
        deletedMovement.index
      ].info.filter(account => account.id !== deletedMovement.id);
    },
    updateAccountBudget(state, updatedAmountObject) {
      state.accounts[updatedAmountObject.index].totalAmount =
        updatedAmountObject.amount;
    }
  },

  getters: {
    getCategoryList(state) {
      return state.categories;
    },
    getAccountList(state) {
      return state.accounts;
    },
    ListDetails(state) {
      return state.accounts.info;
    },
    getAccounts(state) {
      return state.accounts;
    }
  },
  modules: {}
});
