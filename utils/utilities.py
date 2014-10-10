#import your queue backend here and use this file to return data structures 
import traceback

def gather_user_data():
    pass


def gather_host_data():
    fvhl = #some data object
    hostDataArray = list()
    while fvhl.hosts:
        host = fvhl.hosts.pop()
        hostData = {
            "name": host.name,
            "capacity": host.capacity,
            "cores": host.cores,
            "cpus_used": host.cpus_used,
            # "disable": host.disable,
            "free_ram": host.free_ram,
            "jobs": host.jobs,
            # "online": host.online,
            "os": host.os,
            "ram": host.ram,
            "reserved_ram": host.reserved_ram,
            "software": host.software
        }
        hostDataArray.append(hostData)
    return hostDataArray


def gather_race_data():
    fvjl = #some data object
    raceDataArray = list()
    while fvjl.jobs:
        job = fvjl.jobs.pop()
        if job.state in ["RUN", "HOLD", "DONE", "PAUSE"]:
            raceData = {
                # "job_id": job.job_id,
                "comments": job.comments,
                "cpus_busy": job.cpus_busy,
                "dependencies": job.dependencies,
                "done_frames": job.done_frames,
                # "dumpJob": i.dumpJob,
                "end_frame": job.end_frame,
                "env": job.env,
                "fail_frames": job.fail_frames,
                "farm": job.farm,
                # "frames": i.frames,
                # "fromDict": i.fromDict,
                # "getDetails": i.getDetails,
                # "getFrame": i.getFrame,
                # "getJobMsg": i.getJobMsg,
                # "getLog": i.getLog,
                "hold_frames": job.hold_frames,
                "job_id": job.job_id,
                "location": job.location,
                "logdir": job.logdir,
                "os_tags": job.os_tags,
                "outimg": job.outimg,
                # "pause": i.pause,
                "priority": job.priority,
                "queue_frames": job.queue_frames,
                "ram_use": job.ram_use,
                # "requeueAll": i.requeueAll,
                # "requeueDone": i.requeueDone,
                # "requeueFail": i.requeueFail,
                # "requeueRun": i.requeueRun,
                # "requeue_frames": i.requeue_frames,
                # "resume": i.resume,
                "run_frames": job.run_frames,
                "shot": job.shot,
                "show": job.show,
                "software_tags": job.software_tags,
                "start_frame": job.start_frame,
                "state": job.state,
                "submit_time": job.submit_time,
                "total_frames": job.total_frames,
                # "update": i.update,
                "user": job.user,
            }
            fvl = #some data object
            try:
                fvl.getMetaData()
            except Exception, error:
                print error
                tb = traceback.format_exc()
                print tb
            raceData["frames"] = list()
            while fvl.frames:
                frame = fvl.frames.pop()
                raceData["frames"].append({
                    'cores': frame.cores,
                    # 'done': f.done,
                    'elapsed': frame.elapsed,
                    'frame_number': "%04d" % int(frame.frame_number),
                    # 'hold': f.hold,
                    'host': frame.host,
                    'ram': frame.ram,
                    # 'remove': f.remove,
                    # 'requeue': f.requeue,
                    # 'requeueAndExclude': f.requeueAndExclude,
                    'start': frame.start,
                    'state': frame.state,
                    'tries': frame.tries
                })
            raceDataArray.append(raceData)

    return raceDataArray

