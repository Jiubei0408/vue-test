<template>
    <div>
        <notify-list/>
    </div>
</template>

<script>
    import NotifyList from "@/components/page-item/notify-list"
    export default {
        name: 'index',
        components: {
            'notify-list': NotifyList,
        }
    }

</script>